Why do we need a backend if JavaScript runs in the browser?
1. **Security** 
   - Backend keeps sensitive data safe (passwords, API keys, database credentials)
   - Frontend code is visible to everyone in browser DevTools
   - Backend validates and sanitizes user input

2. **Database Access** 
   - Browsers cannot directly connect to databases
   - Backend manages database connections securely
   - Backend handles data storage and retrieval

3. **Business Logic** 
   - Complex calculations that shouldn't be exposed
   - Payment processing
   - User authentication

4. **API Integration** 
   - Some APIs require secret keys
   - Backend can aggregate data from multiple sources
   - Rate limiting and caching

5. **Data Persistence** 
   - Frontend data disappears when browser closes
   - Backend stores data permanently
   - Multiple users can access same data

6. **Processing Power** 
   - Heavy computations can slow down browser
   - Backend servers are more powerful
   - Better for large file processing