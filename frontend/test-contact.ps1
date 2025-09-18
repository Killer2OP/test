# PowerShell script to test the contact form API
$testData = @{
    firstName = "John"
    lastName = "Doe"
    email = "john.doe@example.com"
    phone = "1234567890"
    message = "This is a test message from the contact form."
}

Write-Host "Testing contact form API..."
Write-Host "Sending data:" ($testData | ConvertTo-Json)

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/contact" -Method POST -Body ($testData | ConvertTo-Json) -ContentType "application/json"
    
    Write-Host "Response:" ($response | ConvertTo-Json)
    
    if ($response.success) {
        Write-Host "✅ Contact form test PASSED" -ForegroundColor Green
    } else {
        Write-Host "❌ Contact form test FAILED" -ForegroundColor Red
        Write-Host "Error:" $response.message -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Contact form test ERROR" -ForegroundColor Red
    Write-Host "Error:" $_.Exception.Message -ForegroundColor Red
}
