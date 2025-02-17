import { useState } from "react";
import mainStyle from "../styles/GuestWho.module.scss";
import guestWhoData from "../json/guestWho.json";
import { GuessWho } from "../interfaces";
import { FaMagnifyingGlass } from "react-icons/fa6";

const GuestWho = () => {
  const avaURL = "/images/"; // Ensure correct path
  const [isSelectedPerson, setIsSelectedPerson] = useState(false);
  const [filteredGuests, setFilteredGuests] =
    useState<GuessWho[]>(guestWhoData);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isFilter, setIsFilter] = useState(false);
  const [selectedPersonValue, setSelectedPersonValue] =
    useState<GuessWho | null>(null);

  const updateItemValue = (
    item: GuessWho,
    statusValue: number,
    isUpdateSelectedValue: boolean
  ) => {
    setFilteredGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.id === item.id ? { ...guest, status: statusValue } : guest
      )
    );
    setIsSelectedPerson(isUpdateSelectedValue);
    if (statusValue === 2) {
      setSelectedPersonValue(item);
    }
  };

  const groupedTypes: Record<string, Set<string>> = guestWhoData.reduce(
    (acc: Record<string, Set<string>>, item: GuessWho) => {
      item.type.forEach(({ name, type }) => {
        if (!acc[type]) {
          acc[type] = new Set(); // Use Set to remove duplicates
        }
        acc[type].add(name);
      });
      return acc;
    },
    {}
  );

  const handleFilter = (filter: string) => {
    if (selectedFilter === filter) {
      setFilteredGuests(guestWhoData); // Reset filter
      setSelectedFilter(null);
    } else {
      const filtered = guestWhoData.filter((guest) =>
        guest.type.some(({ name }) => name === filter)
      );
      setFilteredGuests(filtered);
      setSelectedFilter(filter);
    }
  };

  return (
    <div className={mainStyle.container}>
      <div className={mainStyle.filter}>
        <div
          className={mainStyle.filterIcon}
          //  onClick={() => setIsFilter(true)}
        >
          <FaMagnifyingGlass />
        </div>
      </div>
      <div
        onClick={() => setIsFilter(false)}
        className={`${mainStyle.filterContainer} ${
          isFilter
            ? mainStyle.filterContainerVisible
            : mainStyle.filterContainerHidden
        } `}
      >
        <div className={mainStyle.filterContent}>
          <div className={mainStyle.selectedItemContainer}>
            {selectedPersonValue?.name}
          </div>
          {Object.entries(groupedTypes).map(([category, names]) => (
            <div key={category} style={{ marginBottom: "10px" }}>
              <strong>{category}: </strong>
              {Array.from(names).map((name) => (
                <button
                  key={name}
                  onClick={() => handleFilter(name)}
                  style={{
                    margin: "5px",
                    padding: "5px 10px",
                    border: "1px solid black",
                    background: selectedFilter === name ? "#e56464" : "white",
                    cursor: "pointer",
                    borderRadius: ".5rem",
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={mainStyle.content}>
        <div className={mainStyle.guestList}>
          {filteredGuests.map((item) => (
            <div
              key={item.id}
              className={`${mainStyle.guestItem} ${
                item.status === 2 ? mainStyle.guestItemChose : ""
              }`}
            >
              <div className={mainStyle.guestItemInfo}>
                <img
                  src={`${avaURL}${item.avatar}`}
                  alt={item.name}
                  className={mainStyle.guestItemAva}
                />
                <div className={mainStyle.guestItemType}>
                  <div className={mainStyle.guestItemTypeName}>{item.name}</div>
                  <div className={mainStyle.guestItemTypeList}>
                    {item.type.map((type, index) => (
                      <div
                        className={mainStyle.guestItemTypeListItem}
                        key={index}
                      >
                        {/* <div
                          className={mainStyle.guestItemTypeListItemValueTitle}
                        >
                          {type.type}
                        </div> */}
                        <div
                          className={mainStyle.guestItemTypeListItemValueName}
                        >
                          {type.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
    </div>
  );
};

export default GuestWho;
