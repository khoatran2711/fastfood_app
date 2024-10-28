const fs = require('fs');
const path = require('path');
// Define the XML configuration content
const networkSecurityConfig = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">13.229.201.80</domain>
    </domain-config>
</network-security-config>
`;

// Define the file path to save the configuration
const configPath = path.join(
    __dirname,
    '..',
    'android',
    'app',
    'src',
    'main',
    'res',
    'xml',
    'network_security_config.xml'
);

// Ensure the directory exists
fs.mkdirSync(path.dirname(configPath), { recursive: true });

// Write the XML content to the file
fs.writeFileSync(configPath, networkSecurityConfig, 'utf-8');
console.log('Network security config added successfully.');
