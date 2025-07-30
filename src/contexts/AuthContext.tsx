import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  autoLogin: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('landlord_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // Use token API for login
      const response = await fetch('https://joyboryangi.pythonanywhere.com/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Check if user role is "ijarachi"
        if (data.role !== 'ijarachi') {
          throw new Error('Faqat ijarachi (uy egasi) hisoblar uchun ruxsat berilgan');
        }

        const user: User = {
          id: data.id || data.user_id || '1',
          name: data.username || data.name || data.first_name || 'Foydalanuvchi',
          email: data.email || username,
          phone: data.phone || '+998901234567',
          role: 'landlord',
          verified: data.verified || true,
          avatar: data.avatar || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
        };
        
        // Store access token
        if (data.access) {
          localStorage.setItem('access_token', data.access);
        }
        if (data.refresh) {
          localStorage.setItem('refresh_token', data.refresh);
        }
        
        setUser(user);
        localStorage.setItem('landlord_user', JSON.stringify(user));
        return;
      } else {
        // Handle specific error messages from API
        if (data.detail) {
          throw new Error(data.detail);
        } else if (data.non_field_errors) {
          throw new Error(data.non_field_errors[0]);
        } else {
          throw new Error('Login failed');
        }
      }
    } catch (error: any) {
      // Fallback to demo login for development
      if (username === 'admin@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'Jamshid Karimov',
          email: username,
          phone: '+998901234567',
          role: 'landlord',
          verified: true,
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
        };
        
        setUser(mockUser);
        localStorage.setItem('landlord_user', JSON.stringify(mockUser));
        return;
      }
      
      throw new Error(error.message || 'Foydalanuvchi nomi yoki parol noto\'g\'ri');
    } finally {
      setIsLoading(false);
    }
  };

  const autoLogin = async (username: string, password: string) => {
    // Same as login but without loading state for auto-login after registration
    try {
      const response = await fetch('https://joyboryangi.pythonanywhere.com/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      if (response.ok && data.role === 'ijarachi') {
        const user: User = {
          id: data.id || data.user_id || '1',
          name: data.username || data.name || data.first_name || 'Foydalanuvchi',
          email: data.email || username,
          phone: data.phone || '+998901234567',
          role: 'landlord',
          verified: data.verified || true,
          avatar: data.avatar || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
        };
        
        // Store access token
        if (data.access) {
          localStorage.setItem('access_token', data.access);
        }
        if (data.refresh) {
          localStorage.setItem('refresh_token', data.refresh);
        }
        
        setUser(user);
        localStorage.setItem('landlord_user', JSON.stringify(user));
      }
    } catch (error) {
      console.log('Auto-login failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('landlord_user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, autoLogin, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};