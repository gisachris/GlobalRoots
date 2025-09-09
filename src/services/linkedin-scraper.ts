// Apify API configuration
const APIFY_API_TOKEN = import.meta.env.VITE_APIFY_API_TOKEN;
const ACTOR_ID = import.meta.env.VITE_APIFY_ACTOR_ID;

export interface LinkedInProfileData {
    fullName?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    headline?: string;
    location?: string;
    about?: string;
    summary?: string;
    experience?: Array<{
        title?: string;
        company?: string;
        duration?: string;
        description?: string;
        startDate?: string;
        endDate?: string;
    }>;
    education?: Array<{
        school?: string;
        degree?: string;
        field?: string;
        years?: string;
        startYear?: string;
        endYear?: string;
    }>;
    skills?: string[] | Array<{ title: string; subComponents?: any[] }>;
    profilePicture?: string;
    profileImage?: string;
    industry?: string;
    connections?: number;
    certifications?: Array<{
        name?: string;
        issuer?: string;
        date?: string;
    }>;
}

export const scrapeLinkedInProfile = async (profileUrl: string): Promise<LinkedInProfileData> => {
    try {
        // Prepare Actor input for devfusion actor - try different formats
        const input = {
            profileUrls: [profileUrl]
        };

        console.log('Starting LinkedIn profile scrape for:', profileUrl);
        console.log('Sending input to Apify actor:', input);

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
            const errorText = await runResponse.text();
            console.error('Apify API Error Response:', {
                status: runResponse.status,
                statusText: runResponse.statusText,
                body: errorText
            });
            throw new Error(`Failed to start LinkedIn scraping: ${runResponse.status} - ${errorText}`);
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
                console.log('=== RAW LINKEDIN SCRAPER RESPONSE ===');
                console.log('Full response:', JSON.stringify(profileData, null, 2));
                console.log('Available fields:', Object.keys(profileData));
                console.log('Name fields:', {
                    fullName: profileData.fullName,
                    name: profileData.name,
                    firstName: profileData.firstName,
                    lastName: profileData.lastName
                });
                console.log('Skills:', profileData.skills);
                console.log('Experience:', profileData.experience);
                console.log('=== END RAW RESPONSE ===');
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

const calculateYearsOfExperience = (experiences: any[]) => {
    if (!experiences || experiences.length === 0) return 0;

    let totalYears = 0;

    experiences.forEach(exp => {
        if (exp.caption) {
            // Extract years and months from caption like "Sep 2024 - Present · 1 yr 1 mo"
            const yearMatch = exp.caption.match(/(\d+)\s*yr/);
            const monthMatch = exp.caption.match(/(\d+)\s*mo/);

            if (yearMatch) {
                totalYears += parseInt(yearMatch[1]);
            }
            if (monthMatch) {
                totalYears += parseInt(monthMatch[1]) / 12;
            }
        } else {
            // Default to 1 year per position if no duration info
            totalYears += 1;
        }
    });

    return Math.max(1, Math.round(totalYears)); // Minimum 1 year if has experience
};

const extractFullName = (linkedInData: any) => {
    // Try multiple sources for full name
    if (linkedInData.fullName) return linkedInData.fullName;
    if (linkedInData.name) return linkedInData.name;
    if (linkedInData.firstName && linkedInData.lastName) {
        return `${linkedInData.firstName} ${linkedInData.lastName}`;
    }
    if (linkedInData.headline) {
        // Extract name from headline if it contains "Name at Company" format
        const nameMatch = linkedInData.headline.match(/^([^|]+?)\s+at\s+/);
        if (nameMatch) return nameMatch[1].trim();
    }
    return '';
};

export const mapLinkedInDataToUserProfile = (
    linkedInData: any,
    userRole: 'youth' | 'mentor'
) => {
    console.log('=== MAPPING LINKEDIN DATA ===');
    console.log('Raw LinkedIn data:', linkedInData);

    const { role: extractedRole, cleanAbout } = parseAboutField(linkedInData.about || '');
    const fullName = extractFullName(linkedInData);

    // Use the correct field names from the actual scraped data
    const experiences = linkedInData.experiences || [];
    const educations = linkedInData.educations || [];
    const location = linkedInData.addressWithoutCountry || linkedInData.addressWithCountry || '';
    const profilePicture = linkedInData.profilePic || linkedInData.profilePicHighQuality || '';

    // Calculate total experience from all experiences
    const calculatedExperience = calculateYearsOfExperience(experiences);

    console.log('Extracted fullName:', fullName);
    console.log('Location:', location);
    console.log('Calculated experience years:', calculatedExperience);
    console.log('Available skills:', linkedInData.skills);
    console.log('Experiences:', experiences);
    console.log('Educations:', educations);

    // Process skills to ensure they are strings
    const processedSkills = linkedInData.skills ?
        linkedInData.skills.map((skill: any) =>
            typeof skill === 'string' ? skill : skill.title || ''
        ).filter((skill: string) => skill.trim() !== '') : [];

    const baseData = {
        fullName: fullName,
        about: cleanAbout || linkedInData.about || '',
        location: location,
        skills: processedSkills,
        profilePicture: profilePicture,
        headline: linkedInData.headline || '',
    };

    if (userRole === 'mentor') {
        const mentorData = {
            ...baseData,
            currentRole: experiences[0]?.title || linkedInData.jobTitle || extractedRole || linkedInData.headline || '',
            currentCompany: experiences[0]?.subtitle || '',
            industry: '',
            yearsOfExperience: Math.round(calculatedExperience) || 1,
            education: educations,
            experience: experiences,
            hometown: '', // To be filled by user
            certifications: (linkedInData.licenseAndCertificates || []).map((cert: any) => ({
                name: cert.title || '',
                issuer: cert.subtitle || '',
                date: cert.caption || ''
            })),
            fieldOfStudy: educations[0]?.subtitle?.split(',')[0]?.trim() ||
                educations[0]?.subtitle?.split('-')[1]?.trim() || '',
        };
        console.log('Mapped mentor data:', mentorData);
        return mentorData;
    } else {
        // For mentee (youth)
        const menteeData = {
            ...baseData,
            currentStatus: 'Student', // Default, can be updated by user
            currentRole: experiences[0]?.title || educations[0]?.subtitle || '',
            desiredIndustry: '',
            careerStage: 'Early Career', // Default, can be updated by user
            education: educations,
        };
        console.log('Mapped mentee data:', menteeData);
        return menteeData;
    }
};