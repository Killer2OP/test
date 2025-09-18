module.exports = {
    apps: [
        {
            name: "Shivmanda",
            script: "npm start",
            watch: true,
            port: 3000,
            env: {
                NODE_ENV: "production",
                SMTP_HOST: "smtp.gmail.com",
                SMTP_PORT: "587",
                SMTP_SECURE: "false",
                SMTP_USER: "marketingshivananda@gmail.com",
                SMTP_PASS: "nuhuchfkuzrtrrka"
            }
        }
    ]
}