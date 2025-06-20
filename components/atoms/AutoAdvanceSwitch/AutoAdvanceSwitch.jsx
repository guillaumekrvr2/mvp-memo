//components/atoms/AutoAdvanceSwitch/AutoAdvanceSwitch.jsx
import { View, Text, Switch } from 'react-native';
import styles from './styles';

export default function AutoAdvanceSwitch({ enabled, onToggle }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>Auto-advance mode</Text>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: '#767577', true: '#ffffff' }}
        thumbColor={enabled ? '#ffffff' : '#f4f3f4'}
        ios_backgroundColor="#767577"
    />
    </View>
  );
}
