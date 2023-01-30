import { gql, useQuery } from "@apollo/client";
import { ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
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

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const { loading, data, error } = useQuery<GetWildersQuery>(GET_WILDERS);

  console.log({ loading, data });

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        Wilders
      </Text>
      <ScrollView>
        {data?.wilders.map((wilder) => (
          <View>{wilder.firstName}</View>
        ))}
      </ScrollView>
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
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
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
