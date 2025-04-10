module.exports = {
    firstName: 'Amitosh',
    lastName: 'Swain Mahapatra',
    title: 'Computer Whisperer',
    role: '<T> Engineer',
    company: 'CodeRabbit',
    location: 'Bangalore, India',
    email: 'amitosh@recrsn.com',

    links: [
        {
            name: 'twitter',
            url: 'https://twitter.com/recrsn',
            label: 'Follow on Twitter'
        },
        {
            name: 'linkedin',
            url: 'https://www.linkedin.com/in/amitosh-swain/',
            label: 'Connect on LinkedIn'
        },
        {
            name: 'github',
            url: 'https://github.com/recrsn',
            label: 'View GitHub'
        },
        {
            name: 'medium',
            url: 'https://amitosh.medium.com',
            label: 'Check out Medium'
        },
        {
            name: 'newsletter',
            url: 'https://recursivefunction.blog',
            label: 'Read my newsletter'
        },
    ],
    tracking: {
        // If you want to add Google Analytics, just add the tracking ID here
        googleAnalytics: 'G-8937NR279Q',
    },
    production: process.env.NODE_ENV === 'production',
}
