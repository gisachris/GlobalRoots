import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, User } from '../context/AuthContext';

interface UseAuthRedirectResult {
    user: User | null;
    loading: boolean;
}

export const useAuthRedirect = (customRedirect?: string): UseAuthRedirectResult => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            if (customRedirect) {
                navigate(customRedirect);
            } else {
                // Role-based redirection
                switch (user.role) {
                    case 'youth':
                        navigate('/');
                        break;
                    case 'mentor':
                        navigate('/mentor/dashboard');
                        break;
                    default:
                        navigate('/dashboard');
                        break;
                }
            }
        }
    }, [user, loading, navigate, customRedirect]);

    return { user, loading };
};
