import { precacheAndRoute } from "workbox-precaching";

// This will be replaced by the plugin with actual file list
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("sync", (event) => {
  console.log("hello");
  if (event.tag === "sync-data") {
    const formdata = new FormData();
    formdata.append("Id", "52");
    formdata.append("Date", "Sat Aug 02 2025");
    formdata.append("SlaughterhouseId", "31");
    formdata.append("Description", `${Math.random()}`);
    formdata.append("Slaughterer", "23");
    formdata.append("LegalDeletionsCount", "23");
    formdata.append("SlaughteredAnimalsCount", "233");
    formdata.append("ProductionDetails[0][VipId]", "60");
    formdata.append("ProductionDetails[0][ProductionPermitId]", "40");
    formdata.append("ProductionDetails[0][ProductId]", "19");
    formdata.append("ProductionDetails[0][CompanyId]", "24");
    formdata.append("ProductionDetails[0][Weight]", "345");
    formdata.append("ProductionDetails[0][Count]", "4");
    formdata.append("ProductionDetails[1][VipId]", "76");
    formdata.append("ProductionDetails[1][ProductionPermitId]", "74");
    formdata.append("ProductionDetails[1][ProductId]", "4");
    formdata.append("ProductionDetails[1][CompanyId]", "97");
    formdata.append("ProductionDetails[1][Weight]", "3455");
    formdata.append("ProductionDetails[1][Count]", "43");

    event.waitUntil(
      fetch(
        // test
        "https://halalaplicant.cmtcode.ir/api/SlaughterhouseDailyReport",
        {
          method: "PUT",
          headers: {
            Authorization:
              "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwIiwibmFtZSI6Iti52KjYp9izICDYr9in2K_ZiNmG2K82IiwidXNlcm5hbWUiOiIyMzYwMDA3ODY2IiwidHlwZSI6IkFwcGxpY2FudEFjb3VudCIsInBhc3N3b3JkSXNDaGFuZ2VkIjoiVHJ1ZSIsImlzRm9yZWlnbmVyIjoiRmFsc2UiLCJ0ayI6IjZkNWY3MzFkLTc1NTMtNDE5Ni1iNGJmLTA3YzM3MzFmMzljYiIsIm5iZiI6MTc1NDc0MTUwNCwiZXhwIjoxNzU0NzQxNjg0LCJpc3MiOiIxOTIuMTY4LjQ1LjIxOjY1NjUifQ.4xml2PWrOVVeNORhJa8_Kof1MOMW0vOiyeccT_GXsJY",
          },
          body: formdata,
        }
      )
    );
  }
});

// // service-worker.js (or your SW file)
// self.addEventListener('sync', (event) => {
//   if (event.tag === 'sync-data') {
//     const formdata = new FormData();
//     formdata.append('Id', '52');
//     formdata.append('Date', 'Sat Aug 02 2025');
//     formdata.append('SlaughterhouseId', '31');
//     formdata.append('Description', 'aa');
//     formdata.append('Slaughterer', '23');
//     formdata.append('LegalDeletionsCount', '23');
//     formdata.append('SlaughteredAnimalsCount', '233');
//     formdata.append('ProductionDetails[0][VipId]', '60');
//     formdata.append('ProductionDetails[0][ProductionPermitId]', '40');
//     formdata.append('ProductionDetails[0][ProductId]', '19');
//     formdata.append('ProductionDetails[0][CompanyId]', '24');
//     formdata.append('ProductionDetails[0][Weight]', '345');
//     formdata.append('ProductionDetails[0][Count]', '4');
//     formdata.append('ProductionDetails[1][VipId]', '76');
//     formdata.append('ProductionDetails[1][ProductionPermitId]', '74');
//     formdata.append('ProductionDetails[1][ProductId]', '4');
//     formdata.append('ProductionDetails[1][CompanyId]', '97');
//     formdata.append('ProductionDetails[1][Weight]', '3455');
//     formdata.append('ProductionDetails[1][Count]', '43');

//     event.waitUntil(
//       fetch('http://192.168.45.21:6565/api/SlaughterhouseDailyReport', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization:
//             'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwIiwibmFtZSI6Iti52KjYp9izICDYr9in2K_ZiNmG2K82IiwidXNlcm5hbWUiOiIyMzYwMDA3ODY2IiwidHlwZSI6IkFwcGxpY2FudEFjb3VudCIsInBhc3N3b3JkSXNDaGFuZ2VkIjoiVHJ1ZSIsImlzRm9yZWlnbmVyIjoiRmFsc2UiLCJ0ayI6IjZkNWY3MzFkLTc1NTMtNDE5Ni1iNGJmLTA3YzM3MzFmMzljYiIsIm5iZiI6MTc1NDc0MTUwNCwiZXhwIjoxNzU0NzQxNjg0LCJpc3MiOiIxOTIuMTY4LjQ1LjIxOjY1NjUifQ.4xml2PWrOVVeNORhJa8_Kof1MOMW0vOiyeccT_GXsJY',
//         },
//         body: formdata,
//         // body: JSON.stringify({ title: 'New Product', price: 29.99 }),
//       }).catch(async (err) => {
//         console.error('[SW] Sync failed:', err);

//         // Show a notification about the failure
//         self.registration.showNotification('Sync Failed', {
//           body: 'Unable to send data. Please check your connection.',
//           icon: '/icons/failure-icon.png',
//           vibrate: [200, 100, 200],
//           tag: 'sync-failed-notification',
//           renotify: true,
//         });
//       })
//       // fetch('https://fakestoreapi.com/products', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify({ title: 'New Product', price: 29.99 }),
//       // })
//       // fetch('https://jsonplaceholder.typicode.com/posts', {
//       //   method: 'POST',
//       //   body: JSON.stringify({
//       //     title: '111111111111',
//       //     body: 'bar',
//       //     userId: 1000,
//       //   }),
//       //   headers: {
//       //     'Content-type': 'application/json; charset=UTF-8',
//       //   },
//       // }).catch((err) => {
//       //   // Optionally retry or save for later
//       //   alert(err);
//       // })
//     );
//   }
// });
