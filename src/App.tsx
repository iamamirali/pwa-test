/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";

function App() {
  const [value, setValue] = useState("");
  const [confirmButton, setConfirmButton] = useState(false);
  const [startButton, setStartButton] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const pastedData = e.clipboardData?.getData("text");
      if (pastedData) {
        setValue(pastedData.trim());
        setConfirmButton(true);
      }
    };

    const handleAppFocus = () => {
      setStartButton(true);
    };

    window.addEventListener("paste", handlePaste);
    window.addEventListener("focus", handleAppFocus);

    return () => {
      window.removeEventListener("paste", handlePaste);
      window.removeEventListener("focus", handleAppFocus);
    };
  }, []);

  const registerSync = async () => {
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      const registration = await navigator.serviceWorker.ready;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (registration as any).sync.register("sync-data");
        console.log("Background sync registered");
      } catch (err) {
        console.error("Sync registration failed", err);
      }
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Save any needed data in IndexedDB here if needed
      // Register the background sync
      // registerSync();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const getPosts = async () =>
      // await fetch('https://jsonplaceholder.typicode.com/posts')
      // await fetch('https://fakestoreapi.com/products')
      await fetch(
        "https://halalaplicant.cmtcode.ir/api/SlaughterhouseDailyReport?pageLength=10&page=1",
        {
          headers: {
            Authorization:
              "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwIiwibmFtZSI6Iti52KjYp9izICDYr9in2K_ZiNmG2K82IiwidXNlcm5hbWUiOiIyMzYwMDA3ODY2IiwidHlwZSI6IkFwcGxpY2FudEFjb3VudCIsInBhc3N3b3JkSXNDaGFuZ2VkIjoiVHJ1ZSIsImlzRm9yZWlnbmVyIjoiRmFsc2UiLCJ0ayI6IjZkNWY3MzFkLTc1NTMtNDE5Ni1iNGJmLTA3YzM3MzFmMzljYiIsIm5iZiI6MTc1NDc0MTUwNCwiZXhwIjoxNzU0NzQxNjg0LCJpc3MiOiIxOTIuMTY4LjQ1LjIxOjY1NjUifQ.4xml2PWrOVVeNORhJa8_Kof1MOMW0vOiyeccT_GXsJY",
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setPosts(json.value.items);
        });

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     title: '22222',
    //     body: 'bar',
    //     userId: 2000,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // });

    // fetch('https://fakestoreapi.com/products', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ title: 'New Product', price: 29.99 }),
    // });

    getPosts();

    async function requestNotificationPermission() {
      if (!("Notification" in window)) {
        alert("This browser does not support notifications.");
        return;
      }

      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        console.log("Notification permission granted!");
      } else if (permission === "denied") {
        console.log("Notification permission denied.");
      } else {
        console.log("Notification permission dismissed.");
      }
    }

    requestNotificationPermission();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "48px",
        flexWrap: "wrap",
        gap: "48px",
      }}
    >
      <div style={{ minWidth: "300px" }}>
        <h2>تست اسکن</h2>
        <p>{`مقدار اسکن شده: ${value}`}</p>
        {confirmButton && !startButton && (
          <button
            onClick={() => {
              setValue("");
            }}
            style={{ width: 80, height: 80 }}
          >
            تایید اسکن
          </button>
        )}

        {startButton && (
          <button
            onClick={() => {
              setStartButton(false);
              setValue("");
            }}
            style={{ width: 80, height: 80 }}
          >
            شروع اسکن
          </button>
        )}
        {/* <input
        inputMode="none"
        value={""}
        onChange={(e) => setValue(e.target.value)}
        // style={{
        //   position: 'absolute',
        //   opacity: 0,
        //   pointerEvents: 'none',
        // }}
      /> */}
      </div>

      <div>
        <h2>تست آپلود تصویر</h2>
        <ImageUploader onChange={(_, base64) => console.log(base64)} />
      </div>

      <div>
        <h2>تست ریکوئست در بک گراند</h2>
        {posts?.map((item) => (
          <div>
            ID:{(item as any).id} DESC:{(item as any).description}
          </div>
        ))}
        <button onClick={registerSync}>request</button>
      </div>
    </div>
  );
}

export default App;
