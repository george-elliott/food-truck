This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development servers:

```bash
node server.ts
npm run dev
```

Open [http://localhost:3001](http://localhost:3000) with your browser to see the result.

```bash
npm run test
```
To run the test suite.

## Short cuts
I only wrote one test for demonstrative purposes. The UI scales to small screen
sizes but it's otherwise not optimized for mobile. I don't live in SF anymore
so I used mock coordinates. These are the coordinates that will be used if the user
does not allow the browser access to location data.

## Path to production
Vercel makes deploying the React app very simple. The server will need to be hosted
and the React app will need configuration parameters providing details of the host.
The server needs error handling. If I were to take
it to production I would use a serverless function (AWS Lamda or Azure Functions).

## Next Steps
The most impactful thing we can do next is to add information about the results we're
already providing. Linking to the website, or more specifically to the menu would
make our app much more useful. Calculating the walking time could be an interesting feature.
I think the question is whether we want to focus in on the clostest
food trucks or widen the scope to options that are farther away.

I would like to add more interactivity to the map. Including the ability to view content like 
the name and the cuisine. The markers on the map should be an easy way to access any
functionality we provide.