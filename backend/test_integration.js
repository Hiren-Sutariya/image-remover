require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Contact = require('./models/Contact');

const BASE_URL = 'http://localhost:5002/api';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-remover';

async function runTests() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('Connected to database.');

  const testEmail = `test_payment_${Date.now()}@example.com`;
  const testPassword = 'Password123';
  const testContactEmail = `contact_${Date.now()}@example.com`;

  try {
    // ----------------------------------------------------
    // TEST 1: Submit Contact Us Form and check Database
    // ----------------------------------------------------
    console.log('\n--- TEST 1: Contact Form Persistence ---');
    const contactPayload = {
      name: 'Integration Tester',
      email: testContactEmail,
      subject: 'Verification Test',
      message: 'Hello, this is a test from the automatic verification script.'
    };

    const contactRes = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactPayload)
    });

    const contactJson = await contactRes.json();
    console.log('Contact response:', contactJson);
    if (!contactRes.ok || !contactJson.success) {
      throw new Error('Contact submission API failed');
    }

    // Verify in database
    const savedContact = await Contact.findOne({ email: testContactEmail });
    if (!savedContact) {
      throw new Error('Contact message not found in MongoDB database');
    }
    console.log('[PASS] Contact saved successfully. DB ID:', savedContact._id);

    // ----------------------------------------------------
    // TEST 2: Sign Up Test User
    // ----------------------------------------------------
    console.log('\n--- TEST 2: User Sign Up ---');
    const signupPayload = {
      firstName: 'John',
      lastName: 'Doe',
      email: testEmail,
      password: testPassword
    };

    const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupPayload)
    });

    const signupJson = await signupRes.json();
    console.log('Signup response status:', signupRes.status);
    if (!signupRes.ok || !signupJson.token) {
      throw new Error(`Signup failed: ${JSON.stringify(signupJson)}`);
    }

    const token = signupJson.token;
    console.log('[PASS] Test user registered successfully. Token obtained.');

    // ----------------------------------------------------
    // TEST 3: Select Pricing Plan Stub
    // ----------------------------------------------------
    console.log('\n--- TEST 3: Pricing Plan Selection ---');
    const selectRes = await fetch(`${BASE_URL}/pricing/select`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        planName: 'Pro',
        price: 49
      })
    });

    const selectJson = await selectRes.json();
    console.log('Select Pricing response:', selectJson);
    if (!selectRes.ok || selectJson.status !== 'success') {
      throw new Error(`Select plan failed: ${JSON.stringify(selectJson)}`);
    }

    // Verify user plan in database remains 'Free'
    const dbUserSelect = await User.findOne({ email: testEmail });
    if (dbUserSelect.subscriptionPlan !== 'Free' || dbUserSelect.subscriptionStatus !== 'active') {
      throw new Error(`Expected plan to be Free/active. Got: ${dbUserSelect.subscriptionPlan}/${dbUserSelect.subscriptionStatus}`);
    }
    console.log('[PASS] Plan selected successfully (returned stub success and User kept on Free plan).');

    // ----------------------------------------------------
    // TEST 4: Verify Payment Stub
    // ----------------------------------------------------
    console.log('\n--- TEST 4: Payment Verification ---');
    const verifyRes = await fetch(`${BASE_URL}/pricing/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        isMock: true,
        planName: 'Pro',
        orderId: 'mock_order_123'
      })
    });

    const verifyJson = await verifyRes.json();
    console.log('Verify Payment response:', verifyJson);
    if (!verifyRes.ok || verifyJson.status !== 'success') {
      throw new Error(`Verify payment failed: ${JSON.stringify(verifyJson)}`);
    }

    // Verify in database
    const dbUserVerify = await User.findOne({ email: testEmail });
    if (dbUserVerify.subscriptionPlan !== 'Free' || dbUserVerify.subscriptionStatus !== 'active') {
      throw new Error(`Expected plan to be Free/active. Got: ${dbUserVerify.subscriptionPlan}/${dbUserVerify.subscriptionStatus}`);
    }
    console.log('[PASS] Payment verification stub responded successfully.');

    // Clean up test data
    console.log('\nCleaning up test user & contact logs...');
    await User.deleteOne({ email: testEmail });
    await Contact.deleteOne({ email: testContactEmail });
    console.log('Cleanup complete.');

    console.log('\n====================================');
    console.log('ALL INTEGRATION TESTS PASSED SUCCESSFULLY!');
    console.log('====================================');

  } catch (err) {
    console.error('\n[FAIL] Test suite failed with error:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log('Mongoose connection closed.');
  }
}

runTests();
