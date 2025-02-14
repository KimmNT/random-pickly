import { useState } from "react";
import styles from "./styles/App.module.scss"; // Import SASS styles

const App: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [runningTime, setRunningTime] = useState(2000);

  const getRandomItem = () => {
    if (isAnimating) return; // Prevent multiple clicks during animation

    setIsAnimating(true);
    let index = 0;
    let arrayLength = items.length;

    // Start fast animation
    const interval = setInterval(() => {
      if (isShuffle) {
        const randomIndex = Math.floor(Math.random() * arrayLength); // Get a random index
        setCurrentItem(items[randomIndex]); // Set a random item from the array
      } else {
        setCurrentItem(items[index]);
        index = (index + 1) % items.length;
      }
    }, 100); // Change every 100ms (adjust for speed)

    // Stop after a random duration (1.5s to 3s)
    setTimeout(() => {
      clearInterval(interval);
      const randomIndex = Math.floor(Math.random() * items.length);
      setCurrentItem(items[randomIndex]);
      setIsAnimating(false);
    }, runningTime); // Adjust to control how long the animation runs
  };
  const handleInsertNewItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setItems((prevItems) => [...prevItems, inputValue]); // Add new item
      setInputValue(""); // Clear input field after adding
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <div className={styles.headline}>
        <h1 className={styles.title}>Random Item Selector</h1>
        <div className={styles.options}>
          <div className={styles.shuffle}>
            <div
              onClick={() => setIsShuffle(true)}
              className={`${styles.shuffleButton} ${
                isShuffle ? styles.shuffleButtonActive : ""
              }`}
            >
              Shuffle
            </div>
            <div
              onClick={() => setIsShuffle(false)}
              className={`${styles.shuffleButton} ${
                isShuffle ? "" : styles.shuffleButtonActive
              }`}
            >
              Not shuffle
            </div>
          </div>
          <div className={styles.runningContainer}>
            <div
              onClick={() => setRunningTime(2000)}
              className={`${styles.runningTime} ${
                runningTime === 2000 ? styles.runningActive : ""
              }`}
            >
              2s
            </div>
            <div
              onClick={() => setRunningTime(5000)}
              className={`${styles.runningTime} ${
                runningTime === 5000 ? styles.runningActive : ""
              }`}
            >
              5s
            </div>
            <div
              onClick={() => setRunningTime(10000)}
              className={`${styles.runningTime} ${
                runningTime === 10000 ? styles.runningActive : ""
              }`}
            >
              10s
            </div>
          </div>
        </div>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInsertNewItem}
      />
      <div className={styles.list}>
        {items.map((item, index) => (
          <div
            key={index}
            className={currentItem === item ? styles.active : ""}
          >
            {item}
            <span onClick={() => handleRemoveItem(index)}>X</span>
          </div>
        ))}
      </div>
      {items.length > 0 && (
        <button
          className={styles.button}
          onClick={getRandomItem}
          disabled={isAnimating}
        >
          {isAnimating ? "Selecting..." : "Get Random Item"}
        </button>
      )}
      {currentItem && !isAnimating && (
        <div className={styles.selectedItemBackground}>
          <div className={styles.selectedItem}>
            <div className={styles.selectedItemValue}>{currentItem}</div>
            <div className={styles.selectedItemButton}>
              <div
                className={styles.selectedItemButtonItem}
                onClick={() => setCurrentItem("")}
              >
                close
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
