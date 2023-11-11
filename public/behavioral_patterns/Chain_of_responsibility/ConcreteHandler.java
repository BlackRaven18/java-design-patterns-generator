public class $CONCRETE_HANDLER_CLASS_NAME$ implements $HANDLER_CLASS_NAME$ {

    private $HANDLER_CLASS_NAME$ succesor;

    public $CONCRETE_HANDLER_CLASS_NAME$() {
        this.succesor = null;
    }

    public $CONCRETE_HANDLER_CLASS_NAME$($HANDLER_CLASS_NAME$ successor) {
        this.succesor = successor;
    }

    public void setSuccesor($HANDLER_CLASS_NAME$ succesor) {
        this.succesor = succesor;
    }

    @Override
    public void $HANDLE_REQUEST_METHOD_NAME$(String request) {
        if (request.equals("Can handle request")) {
            //handle request here
            System.out.println("Request handled!");
        } else {
            if (succesor != null) {

                // or pass it to your successor it exist
                this.succesor.$HANDLE_REQUEST_METHOD_NAME$(request);
            } else {
                System.out.println("None of succesors could handle the request!");
            }
        }
    }
}
