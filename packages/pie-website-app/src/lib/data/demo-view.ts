export type DemoView = 'student' | 'instructor';

// Match the player demos: answering as a student, evaluating as an instructor.
export function demoEnvironment(view: DemoView) {
	return view === 'instructor'
		? { mode: 'evaluate', role: 'instructor' } as const
		: { mode: 'gather', role: 'student' } as const;
}
