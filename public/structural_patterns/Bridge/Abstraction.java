public abstract class $ABSTRACTION_CLASSNAME$ {

    protected $IMPLEMENTOR_CLASSNAME$ imp;

    public $ABSTRACTION_CLASSNAME$($IMPLEMENTOR_CLASSNAME$ imp){
        this.imp = imp;
    }

    public void operation(){
        imp.$OPERATION_IMPLEMENTATION_METHOD_NAME$();
    }
}
