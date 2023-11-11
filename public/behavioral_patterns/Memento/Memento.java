public class $MEMENTO_CLASS_NAME$ {

    private $STATE_TYPE$ state;

    public $MEMENTO_CLASS_NAME$(){
        this.state = null;
    }

    public $MEMENTO_CLASS_NAME$($STATE_TYPE$ state){
        this.state = state;
    }

    public $STATE_TYPE$ getState() {
        return state;
    }

    public void setState($STATE_TYPE$ state) {
        this.state = state;
    }
}
