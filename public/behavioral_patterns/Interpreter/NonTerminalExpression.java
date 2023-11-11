public class NonTerminalExpression implements AbstractExpression{

    private AbstractExpression abstractExpression;

    public NonTerminalExpression(AbstractExpression abstractExpression) {
        this.abstractExpression = abstractExpression;
    }

    public void setAbstractExpression(AbstractExpression abstractExpression) {
        this.abstractExpression = abstractExpression;
    }

    @Override
    public void interpret(Context context) {

    }
}
