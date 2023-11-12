public class $CONTEXT_CLASS_NAME$ {

    private $STRATEGY_CLASS_NAME$ strategy;

    public $CONTEXT_CLASS_NAME$($CONTEXT_CLASS_NAME$ strategy){
        this.strategy = strategy;
    }

    public void setStrategy($CONTEXT_CLASS_NAME$ strategy) {
        this.strategy = strategy;
    }

    public void contextInterface(){
        strategy.$ALGORITHM_INTERFACE_METHOD_NAME$();
    }
}
