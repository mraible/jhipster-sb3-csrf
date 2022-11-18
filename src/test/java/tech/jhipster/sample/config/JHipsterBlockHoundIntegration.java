package tech.jhipster.sample.config;

import reactor.blockhound.BlockHound;
import reactor.blockhound.integration.BlockHoundIntegration;

public class JHipsterBlockHoundIntegration implements BlockHoundIntegration {

    @Override
    public void applyTo(BlockHound.Builder builder) {
        builder.allowBlockingCallsInside("org.springframework.validation.beanvalidation.SpringValidatorAdapter", "validate");
        builder.allowBlockingCallsInside("tech.jhipster.sample.service.MailService", "sendEmailFromTemplate");
        builder.allowBlockingCallsInside("tech.jhipster.sample.security.DomainUserDetailsService", "createSpringSecurityUser");
    }
}
