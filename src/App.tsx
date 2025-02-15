import { useEffect, useState } from "react";
import styles from "./styles/App.module.scss"; // Import SASS styles
import cards from "./json/cards.json"


const App: React.FC = () => {
  const [items, setItems] = useState<{ name: string; type: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentItem, setCurrentItem] = useState<{ name: string; type: string } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [runningTime, setRunningTime] = useState(2000);
  const [isCard,setIsCard] = useState(false)

  useEffect(() => {
    setItems(isCard ? cards : []);
  }, [isCard]);
  
  const getRandomItem = () => {
    if (isAnimating || items.length === 0) return; // Prevent multiple clicks & empty list error
  
    setIsAnimating(true);
    let index = 0;
    const arrayLength = items.length;
  
    const interval = setInterval(() => {
      setCurrentItem(isShuffle ? items[Math.floor(Math.random() * arrayLength)] : items[index]);
      index = (index + 1) % arrayLength;
      console.log(index)
    }, 100); // Animation speed
  
    setTimeout(() => {
      clearInterval(interval);
      setCurrentItem(items[Math.floor(Math.random() * arrayLength)]);
      setIsAnimating(false);
    }, runningTime);
  };

  const handleInsertNewItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setItems((prevItems) => [...prevItems, {name: inputValue.trim(), type: "Input"}]); // Add new item
      setInputValue(""); // Clear input field after adding
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <div className={styles.headline}>
        <div className={styles.value}>
        <h1 className={styles.title}>Random Item Selector</h1>
        <div className={styles.valueContainer}>
          <div onClick={()=>setIsCard(false)} className={`${styles.valueItem} ${isCard ? "" : styles.valueItemActive}`}>Type in</div>
          <div onClick={()=>setIsCard(true)} className={`${styles.valueItem} ${isCard ? styles.valueItemActive : ""}`}>Use cards</div>
        </div>
        {isCard && <div className={styles.valueRank}>Hearts - Diamonds - Clubs - Spades</div>}
        </div>
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
      <div className={styles.break}></div>
      {isCard ? <></> :       <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInsertNewItem}
      />}
      <div className={styles.list}>
        {items.map((item, index) => (
          <div
            key={index}
            className={currentItem?.name === item.name ? styles.active : ""}
          >
            {item.name}
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
            <div className={styles.selectedItemValue}>{currentItem.name}</div>
            <div className={styles.selectedItemButton}>
              <div
                className={styles.selectedItemButtonItem}
                onClick={() => setCurrentItem(null)}
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
