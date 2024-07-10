/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App, { AppWrapper } from './App';
import {name as appName} from './app.json';
import { LogBox } from 'react-native';

AppRegistry.registerComponent(appName, () => AppWrapper);

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications