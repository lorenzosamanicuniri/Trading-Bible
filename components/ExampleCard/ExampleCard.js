import {
  CardCtaButton,
  CardCtaWrapper,
  CardDate,
  CardValue,
  CardWrapper,
} from "./ExampleCardStyles";

const ExampleCard = ({
  example,
  activeExample,
  setActiveExample,
  handleEditExample,
  handleRemoveExample,
  setisLightboxOpen,
}) => {
  const dateTest = new Date(example.date);
  console.log(example);

  return (
    <CardWrapper onClick={() => setActiveExample(example)}>
      {example.image ? (
        <img
          src={"https://api.tbible.club/uploads/" + example.image}
          alt="Image"
          width={200}
          onClick={() => {
            setisLightboxOpen(true);
          }}
        />
      ) : (
        <img
          src={"/icons/placeholder.svg"}
          alt="Image"
          width={200}
          onClick={() => {
            setisLightboxOpen(true);
          }}
        />
      )}
      <CardDate>{dateTest.toLocaleDateString("hr-HR")}</CardDate>

      <CardValue>{example.measureActual}</CardValue>
      <CardValue bold>{example.measureForecast}</CardValue>
      <CardValue>{example.measurePrevious}</CardValue>

      <CardCtaWrapper>
        <CardCtaButton onClick={() => handleEditExample(example)}>
          <img src="icons/edit.svg" width={24} height={16} />
          Edit Example
        </CardCtaButton>
        <CardCtaButton btnDelete onClick={(e) => handleRemoveExample(example)}>
          <img src="icons/delete.svg" width={24} height={16} />
          Remove Example
        </CardCtaButton>
      </CardCtaWrapper>
    </CardWrapper>
  );
};

export default ExampleCard;
