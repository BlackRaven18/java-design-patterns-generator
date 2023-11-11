public class ConcreteSubject extends Subject{

    private State subjectState;

    public ConcreteSubject(){
        this.subjectState = State.DEFAULT_STATE;
    }

    public State getSubjectState() {
        return subjectState;
    }

    public void setSubjectState(State subjectState) {
        this.subjectState = subjectState;
    }
}
