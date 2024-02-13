import "./featured.css";

const Featured = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src="https://travel.usnews.com/dims4/USNEWS/0f10ebb/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2FNew_Paris_pic_z3GdX0a.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Paris</h1>
          <h2>123 Hotels</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://travel.usnews.com/dims4/USNEWS/981979e/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2Fmain_image_cropped_rome_445x280_f0qQD4i.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Rome</h1>
          <h2>533 Hotels</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://travel.usnews.com/dims4/USNEWS/4d06a60/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2F183346577_JrseKsM.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Dubai</h1>
          <h2>532 Hotels</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
