'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { IconType } from 'react-icons';
import {
	FiBarChart,
	FiChevronDown,
	FiChevronsRight,
	FiDollarSign,
	FiHome,
	FiMonitor,
	FiShoppingCart,
	FiTag,
	FiUsers,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTheme } from './theme-context';

const Sidebar = () => {
	const { theme } = useTheme();
	const [open, setOpen] = useState(true);
	const [selected, setSelected] = useState('Dashboard');

	const colors = {
		background:
			theme === 'light' ? 'var(--foreground)' : 'var(--current-line)',
		textColor:
			theme === 'light' ? 'var(--background)' : 'var(--foreground)',
		selectedBackground: 'var(--current-line)',
		selectedTextColor: 'var(--purple)',
		hoverBackground: 'var(--current-line)',
	};

	return (
		<motion.nav
			layout
			className="sticky top-0 h-screen shrink-0 border-r border-slate-300 p-2"
			style={{
				backgroundColor: colors.background,
				width: open ? '225px' : 'fit-content',
			}}
		>
			<TitleSection open={open} theme={theme} />
			<div className="space-y-1">
				<Option
					Icon={FiHome}
					title="Dashboard"
					selected={selected}
					setSelected={setSelected}
					open={open}
					colors={colors}
				/>
				<Option
					Icon={FiDollarSign}
					title="Plan"
					selected={selected}
					setSelected={setSelected}
					open={open}
					notifs={3}
					colors={colors}
				/>
				<Option
					Icon={FiMonitor}
					title="View Site"
					selected={selected}
					setSelected={setSelected}
					open={open}
					colors={colors}
				/>
				<Option
					Icon={FiShoppingCart}
					title="Products"
					selected={selected}
					setSelected={setSelected}
					open={open}
					colors={colors}
				/>
				<Option
					Icon={FiTag}
					title="Tags"
					selected={selected}
					setSelected={setSelected}
					open={open}
					colors={colors}
				/>
				<Option
					Icon={FiBarChart}
					title="Analytics"
					selected={selected}
					setSelected={setSelected}
					open={open}
					colors={colors}
				/>
				<Option
					Icon={FiUsers}
					title="Members"
					selected={selected}
					setSelected={setSelected}
					open={open}
					colors={colors}
				/>
			</div>
			<ToggleClose open={open} setOpen={setOpen} />
		</motion.nav>
	);
};

const Option = ({
	Icon,
	title,
	selected,
	setSelected,
	open,
	notifs,
	colors,
}: {
	Icon: IconType;
	title: string;
	selected: string;
	setSelected: Dispatch<SetStateAction<string>>;
	open: boolean;
	notifs?: number;
	colors: {
		background: string;
		textColor: string;
		selectedBackground: string;
		selectedTextColor: string;
		hoverBackground: string;
	};
}) => {
	return (
		<motion.button
			layout
			onClick={() => setSelected(title)}
			className={`relative flex h-10 w-full items-center rounded-md transition-colors`}
			style={{
				backgroundColor:
					selected === title
						? colors.selectedBackground
						: 'transparent',
				color:
					selected === title
						? colors.selectedTextColor
						: colors.textColor,
			}}
		>
			<motion.div
				layout
				className="grid h-full w-10 place-content-center text-lg"
			>
				<Icon />
			</motion.div>
			{open && (
				<motion.span
					layout
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.125 }}
					className="text-xs font-medium"
				>
					{title}
				</motion.span>
			)}
			{notifs && open && (
				<motion.span
					initial={{ scale: 0, opacity: 0 }}
					animate={{
						opacity: 1,
						scale: 1,
					}}
					style={{ y: '-50%' }}
					transition={{ delay: 0.5 }}
					className="absolute right-2 top-1/2 size-4 rounded bg-[#bd93f9] text-xs text-white"
				>
					{notifs}
				</motion.span>
			)}
		</motion.button>
	);
};

const TitleSection = ({ open, theme }: { open: boolean; theme: string }) => {
	return (
		<div className="mb-3 border-b border-slate-300 pb-3">
			<div className="flex cursor-pointer items-center justify-between rounded-md transition-colors">
				<div className="flex items-center gap-2">
					<Logo />
					{open && (
						<motion.div
							layout
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.125 }}
						>
							<span
								className="block text-xs font-semibold"
								style={{
									color:
										theme === 'light'
											? 'var(--background)'
											: 'var(--foreground)',
								}}
							>
								API Chaining
							</span>
						</motion.div>
					)}
				</div>
				{open && <FiChevronDown className="mr-2" color={'#ff79c6'} />}
			</div>
		</div>
	);
};

const Logo = () => {
	return (
		<motion.div
			layout
			className="grid size-10 shrink-0 place-content-center rounded-md"
		>
			<svg
				width="24"
				height="auto"
				viewBox="0 0 50 39"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="fill-[#ff79c6]"
			>
				<path
					d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
					stopColor="#000000"
				></path>
				<path
					d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
					stopColor="#000000"
				></path>
			</svg>
		</motion.div>
	);
};

const ToggleClose = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<motion.button
			layout
			onClick={() => setOpen((pv) => !pv)}
			className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-800"
		>
			<div className="flex items-center p-2">
				<motion.div
					layout
					className="grid size-10 place-content-center text-lg"
				>
					<FiChevronsRight
						className={`transition-transform ${
							open && 'rotate-180'
						}`}
						color={'#ff79c6'}
					/>
				</motion.div>
			</div>
		</motion.button>
	);
};

export default Sidebar;
