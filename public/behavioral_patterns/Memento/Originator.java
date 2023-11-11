public class $ORIGINATOR_CLASS_NAME$ {

    private $STATE_TYPE$ state;

    public void setMemento($MEMENTO_CLASS_NAME$ memento){
        this.state = memento.getState();
    }

    public $MEMENTO_CLASS_NAME$ createMemento(){
        return new $MEMENTO_CLASS_NAME$(state);
    }
}
