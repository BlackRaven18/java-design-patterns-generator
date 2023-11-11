public class ConcreteHandler implements Handler {

    private Handler succesor;

    public ConcreteHandler() {
        this.succesor = null;
    }

    public ConcreteHandler(Handler successor) {
        this.succesor = successor;
    }

    public void setSuccesor(Handler succesor) {
        this.succesor = succesor;
    }

    @Override
    public void handleRequest(String request) {
        if (request.equals("Can handle request")) {
            //handle request here
            System.out.println("Request handled!");
        } else {
            if (succesor != null) {

                // or pass it to your successor it exist
                this.succesor.handleRequest(request);
            } else {
                System.out.println("None of succesors could handle the request!");
            }
        }
    }
}
