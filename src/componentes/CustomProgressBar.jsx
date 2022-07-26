import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function CustomTextProgressbar(props) {
	const { children, ...otherProps } = props;
	return (
	  <div
		style={{
		  position: 'relative',
		  width: '200px',
		  height: '200px',
		}}
	  >
		<div style={{ position: 'absolute' }}>
		  <CircularProgressbar {...otherProps} />
		</div>
		<div
		  style={{
			position: 'absolute',
			height: '100%',
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		  }}
		>
		  {props.children}
		</div>
	  </div>
	);
  }