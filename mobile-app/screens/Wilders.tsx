import { gql, useQuery } from "@apollo/client";
import { Button, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { GetWildersQuery } from "../gql/graphql";
import { RootTabScreenProps } from "../types";

export const GET_WILDERS = gql`
  query GetWilders {
    wilders {
      id
      firstName
      lastName
      isApproved
    }
  }
`;

export default function Wilders({ navigation }: RootTabScreenProps<"Wilders">) {
  const { loading, data, error } = useQuery<GetWildersQuery>(GET_WILDERS);

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        Wilders
      </Text>
      <ScrollView style={styles.wilderList}>
        {data?.wilders.map((wilder) => (
          <Text key={wilder.id} style={styles.wilderCard}>
            {wilder.firstName}
            <Button title="Approuver" />
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "bold",
  },
  wilderList: {
    padding: 12,
    width: "100%",
  },
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
