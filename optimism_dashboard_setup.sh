# Make sure you have Node and Git installed on your machine
# This script is for POWERSHELL (windows only), you will need to run this on a Windows machine
# To run this script, run the command in the Windows command prompt below with the name of your laptop as part of the command parameter
# ---> .\optimism_dashboard_setup.sh <laptop name>

# Making use of the built-in args array to access laptop name value and pass it dynamically to set the path for project setup
NAME="$1"
cd "/Users/${NAME}/Desktop/"

# Build as you like, change the name of the folder to that which you desire.
echo 'Setting up the local development environment on Desktop...'
mkdir OP_DASHBOARD

cd OP_DASHBOARD

# Initialize git on the empty repo
git init

# Setting up the Next.js dev environment
npx create-next-app@latest .

# Install the necessary NPM packages
npm install clsx dayjs hex2dec class-variance-authority @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-select @radix-ui/react-slot lucide-react react react-dom recharts swr tailwind-merge tailwindcss-animate @types/hex2dec

# Add the .env file to the .gitignore file
echo '# Hiding environment variables' >> .gitignore
echo '.env' >> .gitignore

# Adding the .env file here for storing API keys
touch .env
echo '# Add your API keys, secrets here' >> .env

echo 'Project setup is complete'