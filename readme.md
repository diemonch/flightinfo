Please plan and implement a service in Node.js which consumes 2 endpoints (https://discovery-stub.comtravo.com/source1 & https://discovery-stub.comtravo.com/source2) exposed by discovery-stub service(details see below).

Your service should get flights from these 2 routes, merge them, remove duplicates and send to the client.
As an identity of the flight can be used the combination of flight numbers and dates.
Note that discovery-stub service is not stable, i.e. it can sometimes fail or reply after couple of seconds. 
The response time of your service shouldn't take longer than 1 second.

Please write tests for your implementation. Also would be great to avoid usage of Nest.js framework.

Below is the info regarding discovery service:

The URL: https://discovery-stub.comtravo.com/
API Specs: https://discovery-stub.comtravo.com/api-docs/
Basic authentication credentials:
    Username: ct_interviewee
    Password: supersecret
<<<<<<< HEAD

Step by Step Instructions:
install redis on docker ###### to cache the data and fetch locally
sudo docker run --name redis -d redis

#### Clone the Project
git clone https://github.com/diemonch/flightinfo.git
cd flightinfo

#### Install required packages
npm install

##### Start the App
npm start

##### Run the app in Postman
http://localhost:3000/app

=======
    
    
    Instructions:
    
    sudo docker run --name redis -d redis
    git clone https://github.com/diemonch/flightinfo.git
    npm install
    npm start
    http://localhost:3000/app
    
    
>>>>>>> 4d6764c649bf53d9c215910cb70d4c6d8eec0428
