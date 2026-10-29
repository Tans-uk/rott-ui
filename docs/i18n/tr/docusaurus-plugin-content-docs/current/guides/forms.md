---
sidebar_position: 1
title: Formlar ve Validation
description: Rott UI ile validation içeren formlar oluşturma
---

# Formlar ve Validation

Rott UI component'leri ve Formik kullanarak validation içeren sağlam formlar oluşturmayı öğrenin.

## Temel Form {#basic-form}

```tsx
import { useState } from 'react';
import { Container, Content, Input, Button } from '@tansuk/rott-ui';

function BasicForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = () => {
    console.log('Form data:', formData);
  };

  return (
    <Container noPadding>
      <Content flex={1} paddingHorizontal={24}>
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />

        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />

        <Button variant="primary" size="full" marginTop={24} onPress={handleSubmit}>
          Submit
        </Button>
      </Content>
    </Container>
  );
}
```

## Formik ile {#with-formik}

```tsx
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container, Content, Input, Button } from '@tansuk/rott-ui';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Too short').required('Password is required'),
});

function LoginForm() {
  return (
    <Container noPadding>
      <Content flex={1} paddingHorizontal={24}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => handleLogin(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                errorMessage={touched.email ? errors.email : ''}
                touched={touched.email}
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
              />

              <Button 
                variant="primary" 
                size="full" 
                marginTop={24}
                onPress={handleSubmit}
              >
                Sign In
              </Button>
            </>
          )}
        </Formik>
      </Content>
    </Container>
  );
}
```

## Karmaşık Form Örneği {#complex-form-example}

```tsx
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too short').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone').required('Required'),
  password: Yup.string().min(8, 'Too short').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
  agreedToTerms: Yup.boolean().oneOf([true], 'You must agree'),
});

function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await registerUser(values);
      Notification.success('Registration successful');
      navigation.navigate('Home');
    } catch (error) {
      Notification.error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Content flex={1} paddingHorizontal={24} keyboardAvoidingView>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          agreedToTerms: false,
        }}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
          <>
            <Input
              name="name"
              type="default"
              label="Full Name"
              value={values.name}
              onChangeText={handleChange('name')}
              errorMessage={touched.name ? errors.name : ''}
              touched={touched.name}
            />

            <Input
              name="email"
              type="email"
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              errorMessage={touched.email ? errors.email : ''}
              touched={touched.email}
            />

            <Input
              name="phone"
              type="phone"
              label="Phone"
              mask="+1 ([000]) [000]-[0000]"
              value={values.phone}
              onChangeText={handleChange('phone')}
              errorMessage={touched.phone ? errors.phone : ''}
              touched={touched.phone}
            />

            <Input
              name="password"
              type="password"
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              errorMessage={touched.password ? errors.password : ''}
              touched={touched.password}
            />

            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              errorMessage={touched.confirmPassword ? errors.confirmPassword : ''}
              touched={touched.confirmPassword}
            />

            <Item row alignItemsCenter marginTop={16}>
              <Input
                name="agreedToTerms"
                type="checkbox"
                value={values.agreedToTerms.toString()}
                onChangeText={(val) => setFieldValue('agreedToTerms', val === 'true')}
              />
              <Label 
                text="I agree to the terms and conditions"
                fontSize="sm"
                marginLeft={8}
              />
            </Item>
            {touched.agreedToTerms && errors.agreedToTerms && (
              <Label 
                text={errors.agreedToTerms}
                variant="danger"
                fontSize="sm"
                marginTop={4}
              />
            )}

            <Button 
              variant="primary" 
              size="full" 
              marginTop={32}
              isLoading={isLoading}
              loadingText="Creating account..."
              onPress={handleSubmit}
            >
              Create Account
            </Button>
          </>
        )}
      </Formik>
    </Content>
  );
}
```

## Form Pattern'leri {#form-patterns}

### Çok Adımlı Form {#multi-step-form}

```tsx
function MultiStepForm() {
  const [step, setStep] = useState(1);

  return (
    <Container noPadding>
      <Header title={`Step ${step} of 3`} />
      <Content flex={1} paddingHorizontal={24}>
        {step === 1 && <PersonalInfoStep onNext={() => setStep(2)} />}
        {step === 2 && <ContactInfoStep onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <ReviewStep onBack={() => setStep(2)} onSubmit={handleSubmit} />}
      </Content>
    </Container>
  );
}
```

### Dinamik Alanlar {#dynamic-fields}

```tsx
function DynamicForm() {
  const [fields, setFields] = useState([{ id: 1, value: '' }]);

  const addField = () => {
    setFields([...fields, { id: fields.length + 1, value: '' }]);
  };

  const removeField = (id) => {
    setFields(fields.filter(f => f.id !== id));
  };

  return (
    <>
      {fields.map((field, index) => (
        <Item key={field.id} row alignItemsCenter marginBottom={12}>
          <Input
            name={`field-${field.id}`}
            type="default"
            placeholder={`Field ${index + 1}`}
            flex={1}
            marginRight={8}
          />
          <Button
            variant="danger-outline"
            circle
            leftIcon={{ name: 'REMOVE', width: 20, height: 20 }}
            onPress={() => removeField(field.id)}
          />
        </Item>
      ))}
      <Button variant="primary-outline" onPress={addField}>
        Add Field
      </Button>
    </>
  );
}
```

## En İyi Uygulamalar {#best-practices}

### Yapılması Gerekenler ✅ {#dos-}

- Validation'ı her tuş vuruşunda değil, blur anında yapın
- Hataları yalnızca alana dokunulduktan sonra gösterin
- Daha iyi UX için uygun input tiplerini kullanın
- Anlaşılır hata mesajları verin
- Gönderim sırasında submit butonunu devre dışı bırakın
- Yükleme state'lerini gösterin

### Yapılmaması Gerekenler ❌ {#donts-}

- Validation'ı çok agresif yapmayın
- Tüm hataları aynı anda göstermeyin
- Yükleme state'lerini ele almayı unutmayın
- Genel geçer hata mesajları kullanmayın

## İlgili Sayfalar {#related}

- [Input component'i](/docs/components/input)
- [Button component'i](/docs/components/button)
- [FormContainer](/docs/components/form-container)
