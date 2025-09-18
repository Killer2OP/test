// Simple test script to test the contact form API using curl
const { exec } = require('child_process');

const testData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "1234567890",
  message: "This is a test message from the contact form."
};

console.log("Testing contact form API...");
console.log("Sending data:", testData);

const curlCommand = `curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '${JSON.stringify(testData)}'`;

exec(curlCommand, (error, stdout, stderr) => {
  if (error) {
    console.log("❌ Contact form test ERROR");
    console.error("Error:", error.message);
    return;
  }

  if (stderr) {
    console.error("Stderr:", stderr);
  }

  console.log("Response:", stdout);

  try {
    const result = JSON.parse(stdout);
    if (result.success) {
      console.log("✅ Contact form test PASSED");
    } else {
      console.log("❌ Contact form test FAILED");
      console.log("Error:", result.message);
    }
  } catch (parseError) {
    console.log("❌ Failed to parse response");
    console.log("Raw response:", stdout);
  }
});
