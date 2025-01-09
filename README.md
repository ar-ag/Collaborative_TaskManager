<h2>Prerequisites</h2>
<ul>
<li>Latest version of Node.js installed on the machine</li>
<li>A database on the Mongo Database</li>
</ul>

<h2>NGROK URL</h2>
<li>Frontend: <code>https://5cc3-2405-201-8002-62ee-4191-7b79-98bd-eb41.ngrok-free.app</code></li>
<li>Backend: <code>https://9194-2405-201-8002-62ee-4191-7b79-98bd-eb41.ngrok-free.app</code></li>

<h2>Installation</h2>
<code>git clone https://github.com/ar-ag/Collaborative_TaskManager</code><br>
<code>cd Collaborative_TaskManager</code><br>
<code>npm install</code><br>

<h2>Using the App on local device</h2>
<ul>
<li>Create <code>.env</code> file in the root of the project</li>
<li>
Copy paste the following code in the .env file of the root directory<br>
<code>
NODE_ENV = development
PORT = 5000
MONGO_URI = [Connection string for the database]
</code>
</li>
<li>
Copy paste the following code in the .env file inside /frontend directory<br>
<code>
REACT_APP_API_URL = '[{Hosted Server Url}/]'
</code>
</li>
<li> Run <code>npm run dev</code> in the root of the folder</li>
</ul>

<h2>Note</h2>
<h4>When using the application on localhost use Hosted Server Url: <code>http:localhost:5000/</code></h4>
<h4>When using the application through ngrok tunneling use Hosted Server Url: <code>https://9194-2405-201-8002-62ee-4191-7b79-98bd-eb41.ngrok-free.app/</code></h4>
<h4>Link to PostMan API Docs: https://documenter.getpostman.com/view/23347149/2sAYQUqu5p</h4>
