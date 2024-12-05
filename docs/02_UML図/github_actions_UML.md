@startuml
actor Developer

participant "GitHub Actions" as GA
participant "Azure Web App" as Azure

Developer -> GA: Push to feat/react branch
GA -> GA: Trigger workflow

group Checkout code
    GA -> GA: actions/checkout@v2
end

group Set up Node.js
    GA -> GA: actions/setup-node@v2
    GA -> GA: Set Node.js version to 16
end

group Install dependencies
    GA -> GA: cd react-ekkyo-app
    GA -> GA: npm install
end

group Build the app
    GA -> GA: cd react-ekkyo-app
    GA -> GA: npm run build
end

group Zip the build directory
    GA -> GA: cd react-ekkyo-app/build
    GA -> GA: zip -r ../build.zip .
end

group Login to Azure
    GA -> Azure: azure/login@v1
    GA -> Azure: Use ${{ secrets.AZURE_CREDENTIALS }}
end

group Deploy to Azure Web App
    GA -> Azure: azure/webapps-deploy@v2
    GA -> Azure: app-name: ekkyowebapp-github-actions-linux
    GA -> Azure: resource-group: ekkyoResourceGroup
    GA -> Azure: package: react-ekkyo-app/build.zip
    GA -> Azure: startup-command: 'pm2 serve /home/site/wwwroot --no-daemon'
end

@enduml