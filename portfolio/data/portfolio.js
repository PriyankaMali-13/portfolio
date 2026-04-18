/**
 * portfolio.js — Portfolio content sourced from Priyanka Mali's CV.
 */

module.exports = {
  name:    "Priyanka Mali",
  title:   "Backend Developer",
  summary:
    "A Backend Developer with extensive experience in cloud-native development and " +
    "DevOps practices, seeking an opportunity to spearhead backend projects, streamline " +
    "deployment processes, and implement scalable and high-performance solutions that " +
    "drive business success.",

  // ── Skills ──────────────────────────────────────────────────────────────────
  skills: {
    "Cloud & AWS": [
      "AWS Lambda", "DynamoDB", "S3", "API Gateway",
      "SNS", "SQS", "CloudWatch", "AWS Lex", "CloudFormation", "AWS IAM",
    ],
    "Backend": [
      "Node.js", "REST APIs", ".NET Core",
    ],
    "DevOps & CI/CD": [
      "Jenkins", "Git", "SourceTree", "Deployment", "DevOps",
    ],
    "Platforms & Tools": [
      "Genesys Cloud", "Jira", "Azure DevOps", "Cisco Jabber", "Scrum",
    ],
    "Methodologies": [
      "Agile", "SDLC", "Scrum", "CIA Documentation", "Unit Testing",
    ],
    "Strengths": [
      "Team Work", "High Achiever", "Focused & Creative", "Self Motivated", "Attention to Detail",
    ],
  },

  // ── Experience ───────────────────────────────────────────────────────────────
  experience: [
    {
      role:     "Senior Software Engineer",
      company:  "Accenture",
      period:   "May 2023 – Present",
      location: "India",
      points: [
        "Design, develop, and maintain conversational interfaces using AWS Lex to enhance customer interactions and support business processes.",
        "Create intents, slots, and utterances to train the AWS Lex bot to effectively understand and respond to user queries.",
        "Integrate AWS Lex chatbots with Genesys Cloud and databases to retrieve and update information as required.",
        "Design, develop, and deploy Node.js AWS Lambda functions to support various business processes and workflows.",
        "Architect and implement serverless application solutions using AWS services like Lambda, DynamoDB, and S3.",
        "Create CIA forms, obtain compliance team approval, deploy changes to QA and PROD environments, execute IQ, and close change requests.",
      ],
    },
    {
      role:     "Software Engineer",
      company:  "Capgemini",
      period:   "March 2021 – May 2023",
      location: "India",
      points: [
        "Hands-on experience on AWS — Build, Deploy and Manage Point of Sale Application.",
        "IaC: Created and managed CloudFormation templates using JSON/YAML to provision AWS services and reduce manual management overhead.",
        "Built S3 buckets, managed policies, and used S3 for storage and backup; managed user permissions via AWS IAM.",
        "Hands-on experience creating Lambdas, DynamoDB tables, API Gateway, SNS, SQS, and CloudWatch Logs.",
        "Created a Lambda Project using .NET Core with AWS Toolkit for Visual Studio; executed end-to-end unit testing.",
        "Involved in SDLC phases including requirement analysis and architectural design using Agile methodologies.",
      ],
    },
  ],

  // ── Projects ─────────────────────────────────────────────────────────────────
  projects: [
    {
      id:          1,
      title:       "AWS Lex Chatbot — Contact Centre",
      description:
        "Designed and deployed a conversational chatbot using AWS Lex integrated with " +
        "Genesys Cloud to automate customer interactions. Trained the bot with custom intents, " +
        "slots, and utterances, and wired it to backend databases for real-time data retrieval and updates.",
      tech:        ["AWS Lex", "Node.js", "Lambda", "Genesys Cloud", "DynamoDB"],
      github:      null,
      live:        null,
    },
    {
      id:          2,
      title:       "Serverless Application Architecture",
      description:
        "Architected and implemented a fully serverless solution on AWS using Lambda, " +
        "DynamoDB, API Gateway, SNS, SQS, and CloudWatch. Reduced infrastructure overhead " +
        "and achieved high scalability with event-driven design patterns.",
      tech:        ["AWS Lambda", "DynamoDB", "API Gateway", "SNS", "SQS", "CloudWatch"],
      github:      null,
      live:        null,
    },
    {
      id:          3,
      title:       "Point of Sale Application on AWS",
      description:
        "Built, deployed, and managed a Point of Sale application on AWS at Capgemini. " +
        "Implemented Infrastructure as Code using CloudFormation (JSON/YAML), provisioned " +
        "S3, IAM, and compute resources, and handled end-to-end deployment pipelines.",
      tech:        ["AWS", "CloudFormation", "S3", "IAM", "Jenkins", "Node.js"],
      github:      null,
      live:        null,
    },
    {
      id:          4,
      title:       "Lambda Microservice — .NET Core",
      description:
        "Created an AWS Lambda microservice using .NET Core via the AWS Toolkit for Visual Studio. " +
        "Delivered complete end-to-end unit testing coverage and integrated the function " +
        "with API Gateway for HTTP-based invocation.",
      tech:        [".NET Core", "AWS Lambda", "API Gateway", "Unit Testing", "AWS Toolkit"],
      github:      null,
      live:        null,
    },
  ],

  // ── Education ────────────────────────────────────────────────────────────────
  education: [
    {
      degree:  "Bachelor of Computer Engineering",
      school:  "Vidyalankar Institute of Technology, University of Mumbai",
      year:    "2020",
      grade:   "CGPI: 8.81",
    },
  ],

  // ── Certifications ────────────────────────────────────────────────────────────
  certifications: [
    "AWS Professional Services: Building a Contact Centre using AWS",
    "Deep Dive: Amazon S3",
    "AWS Fundamentals: Building Serverless Applications",
    "Agile Software Development",
  ],

  // ── Awards ───────────────────────────────────────────────────────────────────
  awards: [
    "⭐ Star of the Month — Capgemini, for outstanding performance and consistently delivering client projects.",
    "🏃 Extra Mile Award — Accenture, for staying agile and resilient and successfully prioritizing critical tasks.",
    "🏆 1st Place — \"Customer at Heart\" category in company Hackathon.",
  ],

  // ── Contact / Social ─────────────────────────────────────────────────────────
  contact: {
    email:    "priyankamali0000@gmail.com",
    phone:    "+91 8291803748",
    linkedin: "https://www.linkedin.com/in/priyanka-mali13/",
    github:   "https://github.com/PriyankaMali-13",
    location: "Mumbai, Maharashtra, India",
  },
};
