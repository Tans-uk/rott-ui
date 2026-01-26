---
sidebar_position: 1
title: Login Form Example
description: Complete login form with validation
---

# Login Form Example

A complete login form with email/password validation, loading states, and error handling.

## Complete Code

```tsx
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Header,
  Content,
  Input,
  Button,
  Label,
  Notification,
} from '@tansuk/rott-ui';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export default function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      // API call
      const response = await loginAPI(values.email, values.password);
      
      Notification.success('Login successful');
      navigation.navigate('Home');
    } catch (error) {
      Notification.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container noPadding>
      <Header
        height={40}
        logo="APP_LOGO"
      />
      
      <Content 
        flex={1} 
        paddingHorizontal={24}
        paddingTop={40}
        keyboardAvoidingView
      >
        <Label 
          text="Welcome Back" 
          fontSize="3xl" 
          fontWeight="bold"
          marginBottom={8}
        />
        
        <Label 
          text="Sign in to continue" 
          fontSize="md" 
          variant="grey-800"
          marginBottom={32}
        />
        
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Input
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                errorMessage={touched.email ? errors.email : ''}
                touched={touched.email}
                marginBottom={16}
              />
              
              <Input
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                errorMessage={touched.password ? errors.password : ''}
                touched={touched.password}
                marginBottom={24}
              />
              
              <Button
                size="full"
                variant="primary"
                fontSize="lg"
                isLoading={isLoading}
                loadingText="Signing in..."
                onPress={handleSubmit}
              >
                Sign In
              </Button>
              
              <Button
                size="full"
                variant="primary-outline"
                fontSize="md"
                marginTop={12}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                Forgot Password?
              </Button>
              
              <Item row justifyContentCenter marginTop={24}>
                <Label text="Don't have an account? " fontSize="sm" variant="grey-800" />
                <Pressable onPress={() => navigation.navigate('Register')}>
                  <Label text="Sign Up" fontSize="sm" variant="primary" fontWeight="bold" />
                </Pressable>
              </Item>
            </>
          )}
        </Formik>
      </Content>
    </Container>
  );
}
```

## Features Demonstrated

- ✅ Form validation with Formik and Yup
- ✅ Error message display
- ✅ Loading states
- ✅ Keyboard handling
- ✅ Navigation integration
- ✅ Toast notifications

## Try It Out

You can run this example in your project or try it in Expo Snack.
