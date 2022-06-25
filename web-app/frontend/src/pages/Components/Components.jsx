import { Hamburger } from '../../components/atoms/Hamburger/Hamburger';
import { menuItems } from '../../components/atoms/Menu/Menu';
import { Button } from '../../components/index';
import '../../styles/index.css';

function Components() {
	return (
		<div className='app-container'>
			<div className='app-section'>
				<h2>Components</h2>
			</div>
			<Hamburger items={menuItems} animate='merge-and-fold' />
			<h3 className='app-title'>Buttons</h3>
			<div className='components-container'>
				<div className='buttons-container'>
					<Button kind='regular' theme='primary'>
						PRIMARY
					</Button>
					<Button kind='outline' theme='primary'>
						PRIMARY
					</Button>
					<Button kind='link' theme='primary'>
						PRIMARY
					</Button>
				</div>
				<div className='buttons-container'>
					<Button kind='regular' theme='secondary'>
						SECONDARY
					</Button>
					<Button kind='outline' theme='secondary'>
						SECONDARY
					</Button>
					<Button kind='link' theme='secondary'>
						SECONDARY
					</Button>
				</div>
				<div className='buttons-container'>
					<Button kind='regular' theme='information'>
						INFO
					</Button>
					<Button kind='outline' theme='information'>
						INFO
					</Button>
					<Button kind='link' theme='information'>
						INFO
					</Button>
				</div>
				<div className='buttons-container'>
					<Button kind='regular' theme='warning'>
						WARNING
					</Button>
					<Button kind='outline' theme='warning'>
						WARNING
					</Button>
					<Button kind='link' theme='warning'>
						WARNING
					</Button>
				</div>
				<div className='buttons-container'>
					<Button kind='regular' theme='danger'>
						DANGER
					</Button>
					<Button kind='outline' theme='danger'>
						DANGER
					</Button>
					<Button kind='link' theme='danger'>
						DANGER
					</Button>
				</div>
				<div className='buttons-container'>
					<Button kind='regular' theme='success'>
						SUCCESS
					</Button>
					<Button kind='outline' theme='success'>
						SUCCESS
					</Button>
					<Button kind='link' theme='success'>
						SUCCESS
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Components;
