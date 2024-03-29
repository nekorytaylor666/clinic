import React from "react";
import ServiceContainer from "components/molecules/ServiceContainer";

const ServicesContainer = () => {
    const ServiceInfo = [
        {
            id: 1,
            title: "Записаться на прием к терапевту",
            subTitle: "",
            imageUrl: "/images/specs/therapy.png",
            url: "/specialization/6220a6057b99531c60b75a14",
            exist: true,
        },
        {
            id: 2,
            title: "Пройти диагностику",
            subTitle: "УЗИ органов всего тела",
            imageUrl: "/images/specs/diagnostic.png",
            url: "/specialization/6220a6d7c901555cecfd5089",
            exist: true,
        },
        {
            id: 3,
            title: "Записаться на прием к косметологу",
            subTitle: "",

            imageUrl: "/images/specs/cosmetology.png",
            url: "/specialization/6220a6057b99531c60b75a16",
            exist: true,
        },
        {
            id: 4,
            title: "Пройти тест у офтольмолога",
            subTitle: "",

            imageUrl: "/images/specs/glasses.png",
            url: "/specialization/6220a6057b99531c60b75a0d",
            exist: true,
        },
    ];
    return (
        <div className="grid grid-cols-2 gap-2 p-4 lg:grid-cols-4 lg:gap-4">
            {ServiceInfo.map((service) => {
                return (
                    <ServiceContainer
                        key={service.id}
                        title={service.title}
                        subTitle={service.subTitle}
                        imageUrl={service.imageUrl}
                        url={service.url}
                        exist={service.exist}
                    />
                );
            })}
        </div>
    );
};

export default ServicesContainer;
