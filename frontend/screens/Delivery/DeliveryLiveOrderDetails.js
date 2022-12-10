import * as React from 'react';
import {List, Button} from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {ListItem} from '@rneui/themed';
const DeliveryLiveOrderDetails = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <>
      <List.Section title="Live Order Details">
        <List.Accordion
          title="Order Status"
          left={props => <AwesomeIcon {...props} color={'#fff'} />}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>

        <List.Accordion
          title="Shop Details"
          left={props => <AwesomeIcon {...props} icon="folder" />}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
        <List.Accordion
          title="Wholeseller point of contact"
          left={props => <AwesomeIcon {...props} icon="folder" />}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
        <List.Accordion
          title="Received"
          left={props => <AwesomeIcon {...props} icon="folder" />}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
    </>
  );
};

export default DeliveryLiveOrderDetails;
