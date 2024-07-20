import { useState } from "react";
import "./index.css";

const Home = ({ initialSlidesList }) => {
  const [slidesList, setSlidesList] = useState(initialSlidesList);
  const [activeSlide, setActiveSlide] = useState(initialSlidesList[0]);
  const [isEditable, setIsEditable] = useState({
    heading: false,
    description: false,
  });

  const handleAddNew = () => {
    const activeSlideIndex = slidesList.indexOf(activeSlide);
    const newSlide = {
      id: slidesList.length + 1,
      heading: "Heading",
      description: "Description",
    };
    const firstHalf = slidesList.slice(0, activeSlideIndex + 1);
    const lastHalf = slidesList.slice(
      activeSlideIndex + 1,
      slidesList.length + 1
    );
    setSlidesList([...firstHalf, newSlide, ...lastHalf]);
    setActiveSlide(newSlide);
  };

  const handleOnClick = (type) => {
    const headingEditable = activeSlide.heading === type;
    const descriptionEditable = activeSlide.description === type;
    setIsEditable({
      heading: headingEditable,
      description: descriptionEditable,
    });
  };

  const handleChangeContent = (event) => {
    const { name, value } = event.target;
    setActiveSlide({ ...activeSlide, [name]: value });
    const formatedList = slidesList.map((eachSlide) => {
      if (eachSlide.id === activeSlide.id) {
        return { ...activeSlide, [name]: value };
      }
      return eachSlide;
    });
    setSlidesList(formatedList);
  };

  const handleBlurContent = () => {
    if (activeSlide.heading === "") {
      setActiveSlide({
        ...activeSlide,
        heading: "Heading",
      });
      const formatedList = slidesList.map((eachSlide) => {
        if (eachSlide.id === activeSlide.id) {
          return { ...activeSlide, heading: "Heading" };
        }
        return eachSlide;
      });
      setSlidesList(formatedList);
    } else if (activeSlide.description === "") {
      setActiveSlide({
        ...activeSlide,
        description: "Description",
      });
      const formatedList = slidesList.map((eachSlide) => {
        if (eachSlide.id === activeSlide.id) {
          return { ...activeSlide, description: "Description" };
        }
        return eachSlide;
      });
      setSlidesList(formatedList);
    }
    setIsEditable({ heading: false, description: false });
  };

  const handleSlideSelect = (id) => {
    const selectedSlide = slidesList.find((each) => each.id === id);
    setActiveSlide(selectedSlide);
  };

  return (
    <div className="home-bg">
      <div className="btn-div">
        <button type="button" className="new-btn" onClick={handleAddNew}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png "
            alt="new plus icon"
            className="plus-img"
          />
          New
        </button>
      </div>
      <div className="total-div">
        <ol className="slides-list-div">
          {slidesList.map((eachSlide, index) => (
            <li
              key={eachSlide.id}
              className={
                activeSlide.id === eachSlide.id
                  ? "active-slide-whole-box"
                  : "slide-whole-box"
              }
              onClick={() => handleSlideSelect(eachSlide.id)}
              testid={`slideTab${index + 1}`}
            >
              <p className="numbers">{index + 1}</p>
              <div className="slide-card">
                <h1 className="slide-heading">{eachSlide.heading}</h1>
                <p>{eachSlide.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="main-slide-div">
          <div className="selected-slid-bg">
            {isEditable.heading ? (
              <input
                type="text"
                name="heading"
                value={activeSlide.heading}
                onChange={handleChangeContent}
                onBlur={handleBlurContent}
                className="user-input input-color"
              />
            ) : (
              <h1
                onClick={() => handleOnClick(activeSlide.heading)}
                className="heading"
              >
                {activeSlide.heading}
              </h1>
            )}
            {isEditable.description ? (
              <input
                type="text"
                name="description"
                value={activeSlide.description}
                onChange={handleChangeContent}
                onBlur={handleBlurContent}
                className="user-input"
              />
            ) : (
              <p
                onClick={() => handleOnClick(activeSlide.description)}
                className="description"
              >
                {activeSlide.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
