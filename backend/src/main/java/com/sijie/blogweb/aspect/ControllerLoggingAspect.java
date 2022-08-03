package com.sijie.blogweb.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.CodeSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ControllerLoggingAspect {
    private Logger logger = LoggerFactory.getLogger(ControllerLoggingAspect.class);

    @Pointcut(value = "execution(public * *(..))")
    public void publicMethods() {}

    @Pointcut(value = "within(com.sijie.blogweb.controller.*)")
    public void controllerMethods() {}

    @Before(value = "publicMethods() && controllerMethods()")
    public void beforeControllerExecution(JoinPoint joinPoint) {
        StringBuilder message = new StringBuilder();
        String methodName = joinPoint.getSignature().getName();
        message.append("Start executing ").append(methodName).append(" (");
        message.append(getParamsAndValues(joinPoint)).append(")");

        logger.info(message.toString());
    }

    private String getParamsAndValues(JoinPoint joinPoint) {
        String[] paramNames = ((CodeSignature)joinPoint.getSignature()).getParameterNames();
        Object[] values = joinPoint.getArgs();

        StringBuilder result = new StringBuilder();
        for (int i = 0; i < paramNames.length; i++) {
            if (i > 0) {
                result.append(", ");
            }
            result.append(paramNames[i]).append("=").append(values[i]);
        }
        return result.toString();
    }

}
