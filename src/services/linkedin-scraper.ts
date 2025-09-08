// Apify API configuration
const APIFY_API_TOKEN = import.meta.env.VITE_APIFY_API_TOKEN;
const ACTOR_ID = import.meta.env.VITE_APIFY_ACTOR_ID;

export interface LinkedInProfileData {
    fullName?: string;
    headline?: string;
    location?: string;
    about?: string;
    experience?: Array<{
        title?: string;
        company?: string;
        duration?: string;
        description?: string;
    }>;
    education?: Array<{
        school?: string;
        degree?: string;
        field?: string;
        years?: string;
    }>;
    skills?: string[];
    profilePicture?: string;
    industry?: string;
    connections?: number;
}

export const scrapeLinkedInProfile = async (profileUrl: string): Promise<LinkedInProfileData> => {
    try {
        // Prepare Actor input
        const input = {
            startUrls: [
                {
                    url: profileUrl,
                    id: "1"
                }
            ]
        };

        console.log('Starting LinkedIn profile scrape for:', profileUrl);

        // Start the actor run
        const runResponse = await fetch(`https://api.apify.com/v2/acts/${ACTOR_ID}/runs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${APIFY_API_TOKEN}`
            },
            body: JSON.stringify(input)
        });

        if (!runResponse.ok) {
            throw new Error('Failed to start LinkedIn scraping');
        }

        const runData = await runResponse.json();
        const runId = runData.data.id;

        console.log('Scraping started, waiting for completion...');

        // Poll for completion
        let attempts = 0;
        const maxAttempts = 30; // 5 minutes max

        while (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds

            const statusResponse = await fetch(`https://api.apify.com/v2/acts/${ACTOR_ID}/runs/${runId}`, {
                headers: {
                    'Authorization': `Bearer ${APIFY_API_TOKEN}`
                }
            });

            const statusData = await statusResponse.json();
            const status = statusData.data.status;

            if (status === 'SUCCEEDED') {
                // Get the results
                const resultsResponse = await fetch(`https://api.apify.com/v2/datasets/${statusData.data.defaultDatasetId}/items`, {
                    headers: {
                        'Authorization': `Bearer ${APIFY_API_TOKEN}`
                    }
                });

                const items = await resultsResponse.json();

                if (!items || items.length === 0) {
                    throw new Error('No profile data found');
                }

                const profileData = items[0] as LinkedInProfileData;
                console.log('LinkedIn profile data retrieved:', profileData);
                return profileData;
            } else if (status === 'FAILED') {
                throw new Error('LinkedIn scraping failed');
            }

            attempts++;
        }

        throw new Error('LinkedIn scraping timed out');
    } catch (error) {
        console.error('LinkedIn scraping failed:', error);
        throw new Error('Failed to scrape LinkedIn profile. Please check the URL and try again.');
    }
};

const parseAboutField = (about: string) => {
    if (!about) return { role: '', cleanAbout: '' };
    
    // Split by double newlines to separate sections
    const sections = about.split('\n\n');
    
    // First section is often the role/headline
    const role = sections[0]?.trim() || '';
    
    // Rest is the actual about content
    const cleanAbout = sections.slice(1).join('\n\n').trim();
    
    return { role, cleanAbout };
};

export const mapLinkedInDataToUserProfile = (
    linkedInData: LinkedInProfileData,
    userRole: 'youth' | 'mentor'
) => {
    const { role: extractedRole, cleanAbout } = parseAboutField(linkedInData.about || '');
    
    const baseData = {
        fullName: linkedInData.fullName || linkedInData.headline?.split(' at ')[0] || '',
        about: cleanAbout,
        location: linkedInData.location || '',
        skills: linkedInData.skills || [],
        profilePicture: linkedInData.profilePicture || '',
        headline: linkedInData.headline || '',
    };

    if (userRole === 'mentor') {
        return {
            ...baseData,
            currentRole: linkedInData.experience?.[0]?.title || extractedRole || linkedInData.headline || '',
            currentCompany: linkedInData.experience?.[0]?.company || '',
            industry: linkedInData.industry || '',
            yearsOfExperience: linkedInData.experience?.length || 0,
            education: linkedInData.education || [],
            experience: linkedInData.experience || [],
            hometown: '', // To be filled by user
            certifications: [], // To be filled by user
            fieldOfStudy: linkedInData.education?.[0]?.field || '',
        };
    } else {
        // For mentee (youth)
        return {
            ...baseData,
            currentStatus: 'Student', // Default, can be updated by user
            currentRole: linkedInData.experience?.[0]?.title || linkedInData.education?.[0]?.degree || '',
            desiredIndustry: linkedInData.industry || '',
            careerStage: 'Early Career', // Default, can be updated by user
            education: linkedInData.education || [],
        };
    }
};