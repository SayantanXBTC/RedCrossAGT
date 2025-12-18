// Test the contact form API
const testContactAPI = async () => {
    console.log('🧪 Testing Contact Form API...\n');

    const testData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '9876543210',
        subject: 'Test Contact Form',
        message: 'This is a test message to verify the contact form is working properly.'
    };

    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });

        const result = await response.json();

        console.log('📧 Contact Form Test Result:');
        console.log('Status:', response.status);
        console.log('Response:', result);

        if (result.success) {
            console.log('✅ Contact form API is working correctly!');
        } else {
            console.log('❌ Contact form API failed:', result.message);
        }
    } catch (error) {
        console.error('❌ Error testing contact API:', error.message);
    }
};

// Run the test
testContactAPI();