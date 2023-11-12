public class ConcreteElement implements $ELEMENT_CLASS_NAME${
    @Override
    public void acceptVisitor($VISITOR_CLASS_NAME$ visitor) {
        visitor.visitConcreteElement(this);
    }

    public void operationA(){

    }
}
