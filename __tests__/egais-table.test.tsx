import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DataTable } from "@/components/shared/egais/data-table";
import { columns, visibleHeaders, mobileHeaders } from "@/components/shared/egais/columns";
import { getPagePositions } from "@/components/shared/services/daily-report/position-service";
import "@testing-library/jest-dom";

vi.mock("@/components/shared/services/daily-report/position-service", () => ({
  getPagePositions: vi.fn().mockResolvedValue({
    content: [
      {
        id: 1,
        sensorNumber: "SN12345",
        product: {
          id: 101,
          unitType: "Фасованная",
          type: "Алкогольная продукция",
          fullName: "Вино Красное",
          shortName: "Вино",
          alcCode: "123ABC",
          capacity: 0.75,
          alcVolume: 12.5,
          productVCode: "V001",
        },
        startDate: new Date("2024-01-01T12:00:00Z"),
        endDate: new Date("2024-01-02T12:00:00Z"),
        vbsStart: 100,
        vbsEnd: 120,
        aStart: 10,
        aEnd: 15,
        percentAlc: 12.5,
        bottleCountStart: 1000,
        bottleCountEnd: 980,
        temperature: 20,
        mode: "Производство",
        status: "Принято в РАР",
      },
      {
        id: 2,
        sensorNumber: "SN67890",
        product: {
          id: 102,
          unitType: "Нефасованная",
          type: "Этиловый спирт",
          fullName: "Спирт медицинский",
          shortName: "Спирт",
          alcCode: "456DEF",
          capacity: 1.0,
          alcVolume: 96,
          productVCode: "V002",
        },
        startDate: new Date("2024-02-01T12:00:00Z"),
        endDate: new Date("2024-02-02T12:00:00Z"),
        vbsStart: 500,
        vbsEnd: 450,
        aStart: 50,
        aEnd: 45,
        percentAlc: 96,
        bottleCountStart: 2000,
        bottleCountEnd: 1980,
        temperature: 22,
        mode: "Отгрузка",
        status: "Принято в УТМ",
      },
    ],
    totalPages: 1,
    totalElements: 2,
  })
}));

describe("DataTable component", () => {
  it("отображает таблицу с данными", async () => {
    render(
      <DataTable
        columns={columns}
        visibleHeaders={visibleHeaders}
        mobileHeaders={mobileHeaders}
        taxpayerNumber={"123456789012"}
      />
    );

    await waitFor(() => {
      expect(document.querySelector(".animate-pulse")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("SN12345")).toBeInTheDocument();
      expect(screen.getByText("SN67890")).toBeInTheDocument();
    });
  });
});
