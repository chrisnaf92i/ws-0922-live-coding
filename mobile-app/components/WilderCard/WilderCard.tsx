import { Button, StyleSheet } from "react-native";
import { Text } from "../Themed";

const WilderCard = ({
  id,
  firstName,
  lastName,
  isApproved,
}: {
  id: string;
  firstName: string;
  lastName: string;
  isApproved: boolean;
}) => {
  return (
    <Text style={styles.wilderCard}>
      {firstName} {lastName}
      <Button title="Approuver" />
    </Text>
  );
};

const styles = StyleSheet.create({
  wilderCard: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 12,
    marginTop: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
});

export default WilderCard;
