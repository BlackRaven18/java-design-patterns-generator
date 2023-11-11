public class $CLIENT_CLASS_NAME$ {

    private $SUBJECT_CLASS_NAME$ subject;

    public $CLIENT_CLASS_NAME$($SUBJECT_CLASS_NAME$ subject){
        // subject can be a proxy
        this.subject = subject;
    }

    public void operation(){
        subject.$REQUEST_METHOD_NAME$();
    }

}
