import axios from 'axios';

const AUTH_API_BASE_URL = 'https://auth-prod.ekos.my.id/api/v1';
const QUIZ_API_BASE_URL = 'https://quiz-prod.ekos.my.id/api/v1';

async function testQuizAPI(email?: string, password?: string) {
    if (!email || !password) {
        console.log('❌ Please provide email and password as arguments');
        console.log('Usage: npx tsx test-quiz-api.ts user@example.com password123');
        return;
    }

    try {
        console.log('Testing Quiz API...');

        // First, authenticate
        console.log('1. Attempting to authenticate...');
        const loginResponse = await axios.post(`${AUTH_API_BASE_URL}/login`, {
            email,
            password
        });

        if (!loginResponse.data.session_token) {
            console.log('❌ Authentication failed. Invalid credentials.');
            return;
        }

        const token = loginResponse.data.session_token;
        console.log('✅ Authentication successful, got token');

        // Now test quiz API
        console.log('2. Fetching quizzes...');
        const quizResponse = await axios.get(`${QUIZ_API_BASE_URL}/quizzes`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ Quiz API response:');
        console.log(JSON.stringify(quizResponse.data, null, 2));

        if (quizResponse.data.success && quizResponse.data.result?.quizzes?.length > 0) {
            console.log(`✅ Found ${quizResponse.data.result.quizzes.length} quizzes`);

            // Test getting quiz details
            const firstQuiz = quizResponse.data.result.quizzes[0];
            console.log(`3. Fetching details for quiz: ${firstQuiz.title}`);
            const detailResponse = await axios.get(`${QUIZ_API_BASE_URL}/quizzes/${firstQuiz.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('✅ Quiz details response:');
            console.log(JSON.stringify(detailResponse.data, null, 2));

            // Test admin delete quiz (only if user has admin role)
            console.log(`4. Testing admin delete quiz: ${firstQuiz.id}`);
            try {
                const deleteResponse = await axios.delete(`${QUIZ_API_BASE_URL}/admin/quizzes/${firstQuiz.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('✅ Delete quiz response:');
                console.log(JSON.stringify(deleteResponse.data, null, 2));
            } catch (deleteError: any) {
                console.log('⚠️  Delete quiz failed (expected if not admin):');
                if (deleteError.response) {
                    console.log(`Status: ${deleteError.response.status}`);
                    console.log('Response:', deleteError.response.data);
                } else {
                    console.log(deleteError.message);
                }
            }

        } else {
            console.log('⚠️  No quizzes found or API returned unexpected format');
        }

    } catch (error: any) {
        console.log('❌ Error testing API:');
        if (error.response) {
            console.log(`Status: ${error.response.status}`);
            console.log('Response:', error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

const [, , email, password] = process.argv;
testQuizAPI(email, password);