import { useState } from "react";
import mainStyle from "../styles/GuestWho.module.scss";
import guestWhoData from "../json/guestWho.json";
import { GuessWho } from "../interfaces";

const GuestWho = () => {
  const avaURL = "/images/"; // Ensure correct path

  const [guests, setGuests] = useState<GuessWho[]>(guestWhoData);
  const [isSelectedPerson, setIsSelectedPerson] = useState(false);
  //   const [selectedPersonValue, setSelectedPersonValue] =
  //     useState<GuessWho | null>(null);

  const updateItemValue = (
    item: GuessWho,
    statusValue: number,
    isUpdateSelectedValue: boolean
  ) => {
    setGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.id === item.id ? { ...guest, status: statusValue } : guest
      )
    );
    setIsSelectedPerson(isUpdateSelectedValue);
    // setSelectedPersonValue(item);
  };

  return (
    <div className={mainStyle.container}>
      <div className={mainStyle.content}>
        <div className={mainStyle.guestList}>
          {guests.map((item) => (
            <div
              key={item.id}
              className={`${mainStyle.guestItem} ${
                item.status === 2 ? mainStyle.guestItemChose : ""
              }`}
            >
              <img
                src={`${avaURL}${item.avatar}`}
                alt={item.name}
                className={mainStyle.guestItemAva}
              />
              <div className={mainStyle.guestItemInfo}>
                <div className={mainStyle.guestItemName}>{item.name}</div>
                {isSelectedPerson && item.status !== 2 ? (
                  <div
                    onClick={() => updateItemValue(item, 1, true)}
                    className={`${mainStyle.guestItemControllerButton} ${mainStyle.guestItemControllerButtonRemove}`}
                  >
                    Remove
                  </div>
                ) : (
                  <div
                    onClick={() => updateItemValue(item, 2, true)}
                    className={`${mainStyle.guestItemControllerButton} ${mainStyle.guestItemControllerButtonActive}`}
                  >
                    Choose
                  </div>
                )}
              </div>
              {item.status === 1 ? (
                <div className={mainStyle.guestItemRemoved}>
                  <div
                    onClick={() => updateItemValue(item, 0, true)}
                    className={`${mainStyle.guestItemUndo}`}
                  >
                    Undo
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>{}</div>
    </div>
  );
};

export default GuestWho;
