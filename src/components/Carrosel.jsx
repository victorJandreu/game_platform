import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Carrosel({
  arrayToRender,
  children,
  arrayNormal,
  IndexModificador,
}) {

  // to rise the number of the indicator to show only the games that match this number in the carrousel 
  function aumentar(IndexModificador, arrayNormal) {
    IndexModificador((prev) =>
      prev.map((x) => {
        if (x.indicador === arrayNormal.length - 1) {
          return { ...x, indicador: 0 };
        } else {
          return { ...x, indicador: x.indicador + 1 };
        }
      })
    );
  }

   // to decresae the number of the indicator to show only the games that match this number in the carrousel 
  function disminuir(IndexModificador, arrayNormal) {
    IndexModificador((prev) =>
      prev.map((x) => {
        if (x.indicador === 0) {
          return { ...x, indicador: arrayNormal.length - 1 };
        } else {
          return { ...x, indicador: x.indicador - 1 };
        }
      })
    );
  }
  return (
    <>
      <h2 className="title">{children}</h2>
      <div className="carrusel">
        <div className="games">{arrayToRender}</div>
        <button
          className="right"
          onClick={() => aumentar(IndexModificador, arrayNormal)}
        >
          <FaArrowRight />
        </button>
        <button
          className="left"
          onClick={() => disminuir(IndexModificador, arrayNormal)}
        >
          <FaArrowLeft />
        </button>
      </div>
    </>
  );
}
